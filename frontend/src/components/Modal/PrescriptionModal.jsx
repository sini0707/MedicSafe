import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";

function PrescriptionModal({ isOpen, onClose, onSubmit }) {
  const [prescriptionText, setPrescriptionText] = useState([
    { medicine: "", dosage: "", duration: "" },
  ]);

  const doctorInfo = useSelector((state) => state.docAuth.doctorInfo);

  const handleSubmit = async () => {
    onSubmit(prescriptionText);
    onClose();
  };

  const handleChange = (index, field, value) => {
    const updatedPrescription = [...prescriptionText];
    updatedPrescription[index][field] = value;
    setPrescriptionText(updatedPrescription);
  };

  const addRow = () => {
    setPrescriptionText([
      ...prescriptionText,
      { medicine: "", dosage: "", duration: "" },
    ]);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div>
            <img src={logo} alt="" style={{ width: "100px", height: "auto" }} />
          </div>
          <ModalHeader className="font-bold text-xl text-center relative">
            <div className="flex justify-center items-center">Prescription</div>
            <hr className="border-green-500 border-t-4 mt-2" />
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-between mb-4">
              <div className="text-left">
                <p>
                  <span className="font-bold"> Doctor Name:</span> <i>Dr.</i>{" "}
                  {doctorInfo.name}
                </p>
              </div>
              <div className="text-right">
                <p>
                  <span className="font-bold">Date:</span>{" "}
                  <span className="italic">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <span className="font-bold">Time:</span>{" "}
                  <span className="italic">
                    {new Date().toLocaleTimeString()}
                  </span>
                </p>
              </div>
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Medicine</th>
                  <th className="py-2 px-4 border-b">Dosage</th>
                  <th className="py-2 px-4 border-b">Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionText.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={row.medicine}
                        onChange={(e) =>
                          handleChange(index, "medicine", e.target.value)
                        }
                        className="w-full border px-2 py-1"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={row.dosage}
                        onChange={(e) =>
                          handleChange(index, "dosage", e.target.value)
                        }
                        className="w-full border px-2 py-1"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={row.duration}
                        onChange={(e) =>
                          handleChange(index, "duration", e.target.value)
                        }
                        className="w-full border px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button onClick={addRow} className="mt-2">
              Add Row
            </Button>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <div className="text-left"></div>
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={handleSubmit}>
                Submit
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </div>
          </ModalFooter>
          <hr className="border-green-700 border-t-4" />
          <div className="text-center my-4">www.medicsafe.online</div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrescriptionModal;
