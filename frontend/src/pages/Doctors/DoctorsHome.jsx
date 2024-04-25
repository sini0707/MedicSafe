const DoctorsHome = () => {
  return (
    <div>
      <div className="md:block md:flex md:flex-col md:items-center w-full md:h-screen">
        <img
          className="w-full h-5/6"
          src="https://img.freepik.com/free-vector/thank-you-doctors-nurses_52683-36501.jpg?w=740&t=st=1696156393~exp=1696156993~hmac=8103fb070d895653e14f15dc3653d62f673c2848bf22bd70b78be46a8c4f893d"
          alt="doctor-banner"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full pb-5 mb-5 justify-evenly">
        <div className="mx-5 md:w-1/2 my-3 md:my-0 bg-blue-400 rounded-lg p-5 text-center text-white">
          <h2 className="font-bold text-xl font-sans mb-2 underline">
            ONLINE PAYMENTS
          </h2>
          <p>
            Online appointment scheduling platforms integrate with payment
            systems, streamlining appointment booking and payment. This eases
            administrative tasks for doctors' offices by eliminating separate
            payment processing, enhancing efficiency, and providing a seamless
            patient experience.
          </p>
        </div>
        <div className="mx-5 md:w-1/2 my-3 md:my-0 bg-blue-400 rounded-lg p-5 text-center text-white">
          <h2 className="font-bold text-xl font-sans mb-2 underline">
            CONTACTLESS BOOKING
          </h2>
          <p>
            {" "}
            Contactless bookings eliminate the need for manual appointment
            scheduling and record-keeping. Doctors and their staff no longer
            need to spend time answering phone calls, checking appointment
            books, or manually entering patient data into their systems. This
            reduces the administrative burden on the doctor's side.
          </p>
        </div>
      </div>
      <div className="flex w-full md:my-24 md:h-72 bg-blue-200">
        <div className="mx-5 my-5 pt-5 w-7/12 italic">
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            "THE PRESENCE OF THE
          </h1>
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            DOCTOR IS THE
          </h1>
          <h1 className="text-4xl md:text-4xl text-center font-sans font-bold text-gray-700">
            BEGINNING OF THE
          </h1>
          <h1 className="text-4xl md:text-6xl text-center font-sans font-bold text-blue-500">
            CURE"
          </h1>
        </div>
        <div className="w-5/12">
          <img
            className="h-full w-full"
            src="https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg?w=740&t=st=1696157429~exp=1696158029~hmac=2851ca3d0e40bc1b77016443ee4fd8f79431473c4585cce45cf0e3011d8734e4"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorsHome;
