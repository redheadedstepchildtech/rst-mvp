interface Props {
  nextStep: () => void;
  prevStep: () => void;
  updateHelpData: (updates: any) => void;
  helpData: any;
}

export default function HelpPhotosStep({
  nextStep,
  prevStep,
  updateHelpData,
  helpData,
}: Props) {
  const handleAddPhoto = (file: File) => {
    if (helpData.photos.length >= 3) return;
    updateHelpData({ photos: [...helpData.photos, file] });
  };

  const handleRemove = (index: number) => {
    const updated = helpData.photos.filter((_: File, i: number) => i !== index);
    updateHelpData({ photos: updated });
  };

  return (
    <div>
      <h2>Photos (optional)</h2>

      <div className="photo-upload-box">
        <p>Drag & drop or click to upload</p>
      </div>

      <div className="photo-thumbs">
        {helpData.photos.map((photo: File, i: number) => (
          <div key={i} className="thumb">
            <span>{photo.name}</span>
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