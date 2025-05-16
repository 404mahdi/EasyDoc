import React, { useContext, useEffect, useState } from "react";
import "./MedDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import MedItem from "../MedItem/MedItem";
import axios from "axios";

const MedDisplay = () => {

  const {drug_list} = useContext(StoreContext);
  
  const [displayList, setDisplayList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(StoreContext)
    // If we have drug_list from context, use it
    if (drug_list && drug_list.length > 0) {
      setDisplayList(drug_list);
      setLoading(false);
    } 
    // Otherwise fetch directly
    else {
      const fetchDrugs = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/drug/list");
          if (response.data.success) {
            setDisplayList(response.data.data);
          } 
        } catch (error) {
          console.error("Error fetching drugs:", error);
          // Fallback data
          
        } finally {
          setLoading(false);
        }
      };
      fetchDrugs();
    }
  }, [drug_list]);

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top medicines near you</h2>
      <div className="food-display-list">
        {drug_list.map((item, index) => {
          return (
            <MedItem
              key={index}
              id={item._id}
              name={item.name}
              mg={item.mg}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MedDisplay;
