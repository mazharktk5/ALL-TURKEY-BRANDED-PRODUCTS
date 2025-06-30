import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* ABOUT US TITLE */}
      <div className="text-center pt-10 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* ABOUT CONTENT */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          className="w-full h-auto rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="space-y-6 text-gray-600 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis illo dolore ducimus nulla ullam inventore soluta vero, consequuntur dicta eum hic iste laboriosam! Dicta saepe harum cupiditate asperiores quod quaerat vel earum. Sequi dolores molestiae deleniti, iusto vel ducimus labore.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quo placeat sit veniam nihil eos dolor cumque provident nesciunt neque architecto labore minima, aperiam earum corporis at ipsam velit esse.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, aliquid minima deserunt recusandae saepe nesciunt incidunt nulla sint corrupti distinctio totam velit, commodi cum blanditiis modi delectus cupiditate dolore sit!
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US TITLE */}
      <div className="text-center text-3xl sm:text-4xl font-semibold py-6">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* FEATURES SECTION */}
      <div className="container mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="feature-card">
          <h4 className="text-base font-semibold text-gray-800">Quality Assurance:</h4>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis odit alias obcaecati explicabo dignissimos commodi quisquam suscipit quas blanditiis quam.
          </p>
        </div>

        <div className="feature-card">
          <h4 className="text-base font-semibold text-gray-800">Convenience:</h4>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis odit alias obcaecati explicabo dignissimos commodi quisquam suscipit quas blanditiis quam.
          </p>
        </div>

        <div className="feature-card">
          <h4 className="text-base font-semibold text-gray-800">Exceptional Customer Service:</h4>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis odit alias obcaecati explicabo dignissimos commodi quisquam suscipit quas blanditiis quam.
          </p>
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <NewsLetterBox />

      {/* Extra styles */}
      <style>{`
        .feature-card {
          border: 1px solid #e5e7eb;
          padding: 2rem;
          border-radius: 1rem;
          background-color: #f9fafb;
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          background-color: #fff;
        }
      `}</style>
    </div>
  )
}

export default About
