import React, { useState, useRef } from 'react';

export default function BookingForm({ email }) {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    date: '',
    guests: '',
    Rooms: '',
    functionType: 'Wedding',
    functionTime: 'Day',      
  });

  const closeButtonRef = useRef(null);
  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormData({
      Name: '',
      Phone: '',
      Email: '',
      date: '',
      guests: '',
      Rooms: '',
      functionType: 'Wedding', 
      functionTime: 'Day',     
    });
  };

  const sendemail = async (e) => {
    e.preventDefault();
    const formattedMessage = `
Subject: Wedding Event Inquiry - "${formData.date}"

Dear "${formData.supplierName || "Supplier"}",

I am reaching out to inquire about your services for an upcoming wedding event scheduled on "${formData.date}". My name is "${formData.Name}", and I am interested in arranging a memorable celebration with the following specifications:

- The event will host approximately "${formData.guests}" guests.
- We will require "${formData.Rooms}" rooms to accommodate our guests comfortably.
- The wedding is planned for the "${formData.functionTime}".
- We would appreciate details on available packages, menu options, and any amenities you provide specifically for wedding functions.

We aim to create a beautiful and seamless experience, and we hope your venue/services align with this vision.

Please also share information regarding your pricing, booking terms, and any cancellation or rescheduling policies. I can be reached directly at "${formData.Phone}" or via email at "${formData.Email}" for any additional details you may need.

Thank you for considering this inquiry. I look forward to your response at your earliest convenience.

Warm regards,  
"${formData.Name}"
`;

    let datasend = {
      email: email,
      subject: 'WED+',
      message: formattedMessage
    };

    try {
      const res = await fetch('http://localhost:5000/api/email', {
        method: 'POST',
        body: JSON.stringify(datasend),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        console.log('Email sent successfully!');
        closeButtonRef.current.click();
        resetFormFields(); 
      } else {
        console.log(`Error: ${data}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleModalClose = () => {
    resetFormFields(); 
  };

  return (
    <div>
      <form ref={formRef} onSubmit={sendemail}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Required for Message
                </h5>
                <button
                  type="button"
                  className="close x"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={closeButtonRef}
                  onClick={handleModalClose} 
                >
                  <span aria-hidden="true">X</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault01"
                      placeholder="Full Name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault02">Contact No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault02"
                      placeholder="Phone No."
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault03">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault03"
                      placeholder="Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault04">Function Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault04"
                      placeholder="DD/MM/YYYY"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">No. of Guests</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault05"
                      placeholder="Minimum 50"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault06">No of Rooms</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault06"
                      placeholder="Rooms"
                      name="Rooms"
                      value={formData.Rooms}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-check-inline">
                  <div className="function-group">
                    <label>Function Type</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="functionType"
                        id="preWedding"
                        value="pre-Wedding"
                        checked={formData.functionType === 'pre-Wedding'}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="preWedding">
                        Pre-Wedding
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="functionType"
                        id="wedding"
                        value="Wedding"
                        checked={formData.functionType === 'Wedding'}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="wedding">
                        Wedding
                      </label>
                    </div>
                  </div>

                  <div className="function-group">
                    <label>Function Time</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="functionTime"
                        id="evening"
                        value="Evening"
                        checked={formData.functionTime === 'Evening'}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="evening">
                        Evening
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="functionTime"
                        id="day"
                        value="Day"
                        checked={formData.functionTime === 'Day'}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor="day">
                        Day
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
