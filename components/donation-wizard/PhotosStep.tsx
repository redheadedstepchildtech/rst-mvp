export default function PhotosStep({ nextStep, prevStep, updateForm, formData }) {
  const handleAddPhoto = (file) => {
    if (formData.photos.length >= 3) return;
    updateForm({ photos: [...formData.photos, file] });
  };

  const handleRemove = (index) => {
    const updated = formData.photos.filter((_, i) => i !== index);
    updateForm({ photos: updated });
  };

  return (
    <div>
      <h2>Photos</h2>

      <div className="photo-upload-box">
        <p>Drag & drop or click to upload</p>
      </div>

      <div className="photo-thumbs">
        {formData.photos.map((photo, i) => (
          <div key={i} className="thumb">
            <span>{photo.name || "Photo"}</span>
            <button onClick={() => handleRemove(i)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="nav-buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}