import React from 'react'
import Loader from '../../../components/Loader/Loading';
import Error from '../../../components/Error/Error';
import {baseURL, useGetProfile} from '../../../../../backend/config/db';
import Loading from '../../../components/Loader/Loading';


const Dashboard = () => {
  const {data,loading,error}=useGetProfile(
    `${baseURL}/doctors/profile/me`
  );
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!Loading && !error && (
          <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
        </div>
        )}
 
      </div>
    </section>
  );
};

export default Dashboard
// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Dashboard

