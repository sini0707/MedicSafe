import React from 'react';
import { jsPDF } from 'jspdf';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AppointmentDetails = ({ appointment, onBack }) => {
  const downloadPrescription = () => {
    const doc = new jsPDF();
    doc.setTextColor(0, 128, 0);
    doc.text("Prescription", 10, 10);
    doc.text(`Doctor: ${appointment.doctor.name}`, 10, 20);
    doc.text(`Specialization: ${appointment.doctor.specialization}`, 10, 30);
    doc.text(`Date: ${appointment.slotDate}`, 10, 40);
    doc.text(`Time: ${appointment.slotTime}`, 10, 50);
    doc.text(`Amount: ${appointment.ticketPrice}`, 10, 60);
    doc.text("Prescription:", 10, 70);
    doc.text(appointment.prescription, 10, 80, { maxWidth: 180 });

    doc.save('prescription.pdf');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
      <div className="mb-4">
        <img src={appointment?.doctor?.imagePath} alt="Doctor" className="w-full rounded-lg" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Doctor: {appointment.doctor.name}</h3>
      <p className="text-gray-700 mb-2">Specialization: {appointment.doctor.specialization}</p>
      <p className="text-gray-700 mb-2">Date: {appointment.slotDate}</p>
      <p className="text-gray-700 mb-2">Time: {appointment.slotTime}</p>
      <p className="text-gray-700 mb-2">Amount: {appointment.ticketPrice}</p>
      <p className="text-gray-700 mb-4">Prescription: {appointment.prescription}</p>
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

export default AppointmentDetails;
