import React, { useState, useEffect } from 'react';
import './Personnel.css';
import { db } from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods

function Personnel({ navigate }) {
  // State to store personnel data from Firestore
  const [firestorePersonnel, setFirestorePersonnel] = useState([]);

  // Fetch personnel data from Firestore on component mount
  useEffect(() => {
    const loadPersonnel = async () => {
      const querySnapshot = await getDocs(collection(db, 'personnel')); // Fetch personnel from Firestore
      const personnelArray = [];
      querySnapshot.forEach((doc) => {
        personnelArray.push({ id: doc.id, ...doc.data() }); // Add each personnel to the array
      });
      setFirestorePersonnel(personnelArray); // Update state with personnel data
    };

    loadPersonnel();
  }, []); // Empty dependency array ensures this runs only on component mount

  // Function to navigate back to the active employees page
  const handleBack = () => {
    navigate('active-employees'); // Navigate to the active employees page
  };

  return (
    <div className="personnel">
      {/* Background video playing in a loop */}
      <video autoPlay loop muted className="background-video">
        <source src="https://videocdn.cdnpk.net/videos/9bd83cd0-f80e-4355-8527-606858b07643/horizontal/previews/clear/large.mp4?token=exp=1721479253~hmac=cf005f8c8b9c9d1195a5963fe6aee01a471b2f7c5c9f6d9a24ca5955220c8aa2" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h2>Company Personnel</h2>

        {/* Hardcoded personnel list */}
        <div className="personnel-list">
          <div className="person moved">Munny Mpapi (female) - Marketing Director - moved to Pretoria branch - Ref Number: EMP011</div>
          <div className="person terminated">Palane Pilot (male) - Web Designer - Contract Terminated - Ref Number: EMP012</div>
          <div className="person moved">Tebogo Zwane (male) - Frontend Developer - moved to Mpumalanga branch - Ref Number: EMP013</div>
          <div className="person terminated">Ntombi Mkhize (female) - Sales Representative - Resigned - Ref Number: EMP014</div>
          <div className="person moved">James Tlou (male) - Software Engineer - moved to Durban branch - Ref Number: EMP015</div>
          <div className="person terminated">Emily Ngwenya (female) - HR Manager - Contract Terminated - Ref Number: EMP016</div>
          <div className="person terminated">Peter Molefe (male) - Accountant - Resigned - Ref Number: EMP017</div>
          <div className="person moved">Sarah Lethabo (female) - Customer Support - moved to Cape Town branch - Ref Number: EMP018</div>
          <div className="person terminated">Michael Ndlovu (male) - Security - Resigned - Ref Number: EMP019</div>
          <div className="person terminated">Anna Nkosi (female) - Technician - Contract Terminated - Ref Number: EMP020</div>
        </div>

        {/* Firestore personnel list */}
        <div className="personnel-list">
          {firestorePersonnel.map((person) => (
            <div
              key={person.id}
              className={`person ${person.status === 'moved' ? 'moved' : 'terminated'}`}
            >
              {person.name} ({person.gender}) - {person.position} - {person.status === 'moved' ? `moved to ${person.branch} branch` : `Contract ${person.status}`} - Ref Number: {person.refNumber}
            </div>
          ))}
        </div>

        {/* Back button to navigate to the active employees page */}
        <button onClick={handleBack}>Back</button>
      </div>

      {/* Footer with company policy message */}
      <footer className="footer">
        <p>As per company policy, this data/information must not be edited or deleted.</p>
      </footer>
    </div>
  );
}

export default Personnel;
