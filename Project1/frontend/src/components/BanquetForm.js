import React, { useState, useEffect, useRef } from 'react';
import './BanquetForm.css';

export default function Form({ email , loaddata }) {
  const [Banquet, setBanquet] = useState('');
  const [Details, setDetails] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Price, setPrice] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  
  const closeButtonRef = useRef(null); 

  const resetFormFields = () => {
    setBanquet('');
    setDetails('');
    setAddress('');
    setCity('');
    setState('');
    setPrice('');
    setImagePreviewUrl('');
    setValidationMessage('');
  };

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();

    let isValid = true;
    setValidationMessage('');

    if (!Banquet || !Details || !Address || !City || !State || !Price || !imagePreviewUrl) {
      setValidationMessage('Please fill out all the details.');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        email,
        Banquet,
        Details,
        Address,
        City,
        State,
        Price,
        imagePreviewUrl,
      };

      try {
        const response = await fetch('http://localhost:5000/api/createOrUpdateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const json = await response.json();
        console.log(json);
        await loaddata();

        if (json.success) {
          setValidationMessage('Banquet successfully created or updated!');
          resetFormFields(); 
          closeButtonRef.current.click();
        } else {
          setValidationMessage(`Error: ${json.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setValidationMessage('An error occurred while submitting the form.');
      }
    }
  };

  const handleModalClose = () => {
    resetFormFields();
  };

  return (
    <div>
      <form onSubmit={handleCreateOrUpdate}>
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
                  Banquet Details
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
                {/* Form Fields */}
                <div className="form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Banquet Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault01"
                      placeholder="Name"
                      value={Banquet}
                      onChange={(e) => setBanquet(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault02">Details</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault02"
                      placeholder="Details"
                      value={Details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault03">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault03"
                      placeholder="Address"
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="validationDefault04">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault04"
                      placeholder="City"
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault05"
                      placeholder="State"
                      value={State}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault06">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="validationDefault06"
                      placeholder="Price"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3 md-7">
                    <label htmlFor="validationDefaultImage">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefaultImage"
                      placeholder="Enter image URL"
                      value={imagePreviewUrl}
                      onChange={(e) => setImagePreviewUrl(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {imagePreviewUrl && (
                  <div className="mb-3">
                    <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                  </div>
                )}

                <div className="form-group">
                  <div className="form-check">
                    <p id="pass-validate-message">{validationMessage}</p>
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
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
