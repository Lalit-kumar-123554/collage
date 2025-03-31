


function App() { 
  
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // To track login status
    const [images, setImages] = React.useState([]); // Store all uploaded images
    const [imagePreview, setImagePreview] = React.useState(null); // For preview of a new image being selected
    const [imageUploaded, setImageUploaded] = React.useState(false); // To track if image is uploaded
    const [showImagePreview, setShowImagePreview] = React.useState(false); // To show the uploaded image after clicking "Uploaded Image"
  
    // Handle Login
    const handleLogin = (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      if (!email || !password) {
        setErrorMessage("Please fill in both fields.");
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      setSuccessMessage("Login successful!");
      setIsLoggedIn(true);
    };
  
    // Handle image selection
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newImages = [...images];
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result); // Add new image to the array
          setImages(newImages);
          setImagePreview(reader.result); // Set preview of newly selected image
          setImageUploaded(true);
        };
        reader.readAsDataURL(file);
      }
    };
  
    // Handle image submission
    const handleImageSubmit = (e) => {
      e.preventDefault();
      if (imagePreview) {
        alert("Image successfully submitted!");
      } else {
        alert("Please select an image before submitting.");
      }
    };
  
    // Handle Logout
    const handleLogout = () => {
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
      setImages([]); // Reset images
      setImagePreview(null);
      setImageUploaded(false);
      setShowImagePreview(false); // Reset the image preview visibility
    };
  
    // Handle clicking the "Uploaded Image" button
    const handleUploadedImageClick = () => {
      setShowImagePreview(true);
    };
  
    return (
      <div>
        {!isLoggedIn ? (
          <div id="login">
            <h2>Login</h2>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div>
            {/* Top Row with Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px",bottom :"5px",gap:"8px"}}>
              <button onClick={handleUploadedImageClick}>Uploaded Image</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
  
            {/* Upload Image Section */}
            {!showImagePreview ? (
              <div id="upload-container">
                <h2>Upload an Image</h2>
                <form onSubmit={handleImageSubmit}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="preview-container">
                      <h3>Image Preview:</h3>
                      <img
                        src={imagePreview}
                        alt="Selected Image Preview"
                      />
                    </div>
                  )}
                  <button className="submit-button" type="submit">
                    Submit Image
                  </button>
                </form>
                {imageUploaded && <div className="success">Image uploaded successfully!</div>}
              </div>
            ) : (
              // Display uploaded images after clicking "Uploaded Image"
              <div>
                <h2>Uploaded Images</h2>
                {images.length > 0 ? (
                  <div className="image-gallery">
                    {images.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image} alt={`Uploaded ${index}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No images uploaded yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  const rootElement = ReactDOM.createRoot(document.getElementById("root"));
  rootElement.render(<App />);
  
  