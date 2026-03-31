import React from "react";

const MetropolitanMessage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-6">
          Metropolitan's Message
        </h1>

        <div className="w-20 h-1 bg-red-700 mx-auto mb-6 rounded"></div>

        <div className="flex justify-center mb-6">
          <img
            src="./src/img/thirumeni.jpg"
            alt="Metropolitan"
            className="rounded-xl shadow-md w-60 md:w-72 border-4 border-red-100"
          />
        </div>

        <div className="space-y-5 text-gray-700 leading-relaxed text-justify">

          <p className="font-medium text-red-700">
            Dear Brothers & Sisters,
          </p>

          <p>
            Greetings from the Believers Church and the Believers Church Medical
            College & Hospital. You may ask ‘why another Medical College and
            Hospital?’ The answer is very simple. In St. Mark’s Gospel Chapter 2
            and verse 22, Jesus says, “No one pours new wine into old wineskins…”
          </p>

          <p>
            The Believers Church was formed in response to God’s call to be a new
            wineskin in this generation, to glorify God by knowing Jesus
            intimately and by being conformed into His image.
          </p>

          <p>
            The Believers Church Medical College & Hospital forms an important
            part of the healing arm of the Church. Through telemedicine and
            outreach, we aim to reach the needy across the country.
          </p>

          <p>
            We live in a time of individualism, but true success lies in
            interdependence. We aim to train doctors and healthcare professionals
            in servant leadership.
          </p>

          <p>
            Life and faith become meaningful when shared with others in love and
            purpose.
          </p>

          <p className="italic text-center text-red-600 font-medium">
            “That they may be one as we are one.” (John 17:11)
          </p>

        </div>

        
        <div className="mt-10 bg-red-50 p-6 rounded-xl border border-red-100">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Enable me, Jesus,
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            {[
              "to build faith for someone",
              "to give hope to the hopeless",
              "to create confidence",
              "to generate enthusiasm",
              "to spread peace",
              "to turn dreams to reality",
              "to turn problems into opportunities",
              "to lift up the fallen",
              "to bind up the hurting",
              "to say a kind word",
              "to let someone lean on me",
              "to find joy in serving",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-gray-700">
            and thus I may become more like you.
          </p>
        </div>

      
        <div className="mt-8 text-right border-t pt-6">
          <p className="font-semibold text-gray-800">
            Moran Mor Samuel Theophilus Metropolitan
          </p>
          <p className="text-red-700 font-medium">
            The Lord bless you and give you peace.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MetropolitanMessage;