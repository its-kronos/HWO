export const ParamControl = () => {
    return(
        <form className="flex flex-col space-y-4">
        <div>
          <label className="block">
            Focal Length:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Sensor Size:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Aperture:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Pitch:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Yaw:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Roll:
            <input
              type="number"
              className="border p-2 rounded"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-4">Submit</button>
      </form>
    )
}