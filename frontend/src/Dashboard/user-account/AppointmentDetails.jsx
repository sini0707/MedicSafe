import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import PropTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppointmentDetails = ({ appointment, onBack }) => {
  const [appointmentP, setAppointment] = useState(appointment);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    setAppointment(appointment);
    if (appointment.prescription) {
      setPrescriptions(appointment.prescription);
    }
  }, [appointment]);

  const downloadPrescription = () => {
    const doc = new jsPDF();

  
    const marginLeft = 10;
    const marginTop = 10;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - marginLeft * 2;


    doc.setTextColor(0, 128, 0);
    doc.setFontSize(22);
    doc.text("Prescription", pageWidth / 2, marginTop, { align: 'center' });


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

  
    
    doc.setLineWidth(0.5);
    doc.line(marginLeft, marginTop + 12, pageWidth - marginLeft, marginTop + 12);

  
    let currentHeight = marginTop + lineHeight * 2;
    doc.setFontSize(16);
    doc.text(`Doctor: ${appointmentP.doctor.name}`, marginLeft, currentHeight);
    currentHeight += lineHeight;
    doc.text(`Specialization: ${appointmentP.doctor.specialization}`, marginLeft, currentHeight);
    currentHeight += lineHeight;
    doc.text(`Date: ${appointmentP.slotDate}`, marginLeft, currentHeight);
    currentHeight += lineHeight;
    doc.text(`Time: ${appointmentP.slotTime}`, marginLeft, currentHeight);
    currentHeight += lineHeight;
    doc.text(`Amount: ${appointmentP.ticketPrice}`, marginLeft, currentHeight);
    currentHeight += lineHeight * 2;

    doc.setFontSize(14);
    doc.text("Prescription:", marginLeft, currentHeight);
    currentHeight += lineHeight;

 
    doc.setFontSize(12);
    prescriptions.forEach((prescription, index) => {
      const prescriptionText = `Medicine: ${prescription.medicine}, Dosage: ${prescription.dosage}, Duration: ${prescription.duration}`;
      const splitText = doc.splitTextToSize(prescriptionText, maxWidth);
      doc.text(splitText, marginLeft, currentHeight);
      currentHeight += splitText.length * lineHeight;
      if (index < prescriptions.length - 1) {
        currentHeight += lineHeight; 
      }
    });

   
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, marginLeft, doc.internal.pageSize.getHeight() - marginTop);

  
    doc.save('prescription.pdf');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
      <div className="mb-4">
        <img src={appointmentP?.doctor?.imagePath} alt="Doctor" className="w-full rounded-lg" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Doctor: {appointmentP?.doctor?.name}</h3>
      <p className="text-gray-700 mb-2">Specialization: {appointmentP?.doctor?.specialization}</p>
      <p className="text-gray-700 mb-2">Date: {appointmentP?.slotDate}</p>
      <p className="text-gray-700 mb-2">Time: {appointmentP?.slotTime}</p>
      <p className="text-gray-700 mb-2">Amount: {appointmentP?.ticketPrice}</p>
      <p className="text-gray-700 mb-4">Prescriptions:</p>
      <ul className="text-gray-700 mb-4">
        {prescriptions.map((prescription, index) => (
          <li key={index}>
            Medicine: {prescription.medicine}, Dosage: {prescription.dosage}, Duration: {prescription.duration}
          </li>
        ))}
      </ul>

      <div className="flex space-x-2">
        <button
          onClick={onBack}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Back to Appointments
        </button>
        <button
          onClick={downloadPrescription}
          className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <i className="fas fa-download"></i>
        </button>
      </div>
    </div>
  );
};


AppointmentDetails.propTypes = {
  appointment: PropTypes.shape({
    doctor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specialization: PropTypes.string.isRequired,
      imagePath: PropTypes.string,
    }).isRequired,
    slotDate: PropTypes.string.isRequired,
    slotTime: PropTypes.string.isRequired,
    ticketPrice: PropTypes.string.isRequired,
    prescription: PropTypes.arrayOf(
      PropTypes.shape({
        medicine: PropTypes.string.isRequired,
        dosage: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AppointmentDetails;

