import React, { useState } from 'react';


export default function Batch() {
  
  const initialSlots = Array.from({ length: 12 }, (_, i) => {
    const startHour = (i * 2 + 8) % 24;
    const endHour = (startHour + 2) % 24;
    return {
      time: `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`,
      isReserved: false,
    };
  });

  const [slots, setSlots] = useState(initialSlots);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    cementType: '',
    slot: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSlotReservation = (e) => {
    e.preventDefault();
    if (!formData.slot) {
      alert('Please select a slot.');
      return;
    }

    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.time === formData.slot ? { ...slot, isReserved: true } : slot
      )
    );

    setFormData({ name: '', companyName: '', cementType: '', slot: '' });
    alert(`Slot reserved successfully for ${formData.companyName}.`);
  };

  return (
    <>
      <div className="app">
        <div className="form-container">
          <h2>Batching Plant Slot Reservation</h2>
          <form onSubmit={handleSlotReservation}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <label>Type of Cement</label>
            <select
              name="cementType"
              value={formData.cementType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Cement Type --</option>
              <option value="OPC">Ordinary Portland Cement (OPC)</option>
              <option value="PPC">Pozzolana Portland Cement (PPC)</option>
              <option value="PSC">Portland Slag Cement (PSC)</option>
              <option value="White">White Cement</option>
              <option value="Rapid">Rapid Hardening Cement</option>
              <option value="LowHeat">Low Heat Cement</option>
            </select>

            <label>Select Slot</label>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Slot --</option>
              {slots.map(
                (slot) =>
                  !slot.isReserved && (
                    <option key={slot.time} value={slot.time}>
                      {slot.time}
                    </option>
                  )
              )}
            </select>

            <button type="submit">Reserve Slot</button>
          </form>

          <h3>Reserved Slots</h3>
          <ul>
            {slots
              .filter((slot) => slot.isReserved)
              .map((slot) => (
                <li key={slot.time}>{slot.time} - Reserved</li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
