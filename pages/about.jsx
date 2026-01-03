import Links from '@/components/common/Links';
import MissionVision from '@/components/common/MissionVision';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import React from 'react';

// Fetch data from the Strapi backend
export async function getServerSideProps() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/about-us-image`, {
      params: {
        populate: '*',
      },
    });

    // Extract image URL from the response
    const imgData = response.data?.data?.attributes?.img?.data?.attributes?.url;
    const AboutImg = imgData ? '${BACKEND_URL}/' + imgData : null;

    return {
      props: {
        AboutImg,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        AboutImg: null,
      },
    };
  }
}

const About = ({ AboutImg }) => {
  return (
    <div className="flex flex-col w-full overflow-x-clip ">
      <div className="w-full h-max-[248px] h-max border-b m-5 pt-6 ">
        <h1 className="md:text-6xl text-3xl font-epilogue w-[100%] md:w-[70%]">
          Computer Science and Engineering Association
        </h1>
        <p className="text-xs text-[var(--primary-light)] md:text-sm font-ibmplexmono font-medium uppercase bg-[var(--image-bg)] line-clamp-1 w-max my-5 mx-2">
          National Institute of Technology Calicut
        </p>
      </div>

      <MissionVision />

      <div className="border-b flex items-center justify-center flex-col m-6 ">
        <div className="max-w-[1100px] w-full">
          {AboutImg ? (
            <div className="w-full h-[300px] bg-[var(--image-bg)] overflow-clip relative">
              <img src={AboutImg} alt="About Us" className='absolute' />
            </div>
          ) : (
            <div className="w-full h-64 bg-[var(--image-bg)]"></div>
          )}
          <div className="w-full max-w-[1100px] py-4">
            <p className="text-xs text-[var(--primary-light)] md:text-sm font-ibmplexmono font-medium uppercase bg-[var(--image-bg)] line-clamp-1 w-max my-2 mx-2">
              About Us
            </p>

            <h2 className="font-epilogue text-[36px] leading-none py-4">An association of professionals, students & enthusiasts</h2>

            <p className="font-inter py-2 text-[var(--primary-light)] leading-[135%]  ">
              Computer Science and Engineering Association is an integral part of the Department of Computer Science and Engineering of NIT Calicut. We organize events which help in enhancing technical and scientific aptitude among students like coding competitions, technical workshops and talks by eminent researchers.
            </p>
            <p className="font-inter py-2 text-[var(--primary-light)] leading-[135%] ">
              We also provide a platform for interaction among the students from different courses and years; guidance on internships, placements, and projects, etc. by organizing regular talks and other events. CSEA also undertakes the maintenance of Labs and Web resources of the department.Apart from these, organizing Freshers for the incoming batches and Farewell for the outgoing batches of the department are parts of activities of CSEA.
            </p>
          </div>
        </div>
      </div>

      {/* <Links /> */}

    </div>
  );
};

export default About;
