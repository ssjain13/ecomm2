import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the uploaded image
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="image">Select Image:</FormLabel>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            mb="3"
          />
        </FormControl>
        <Button type="submit" disabled={!image}>
          Upload
        </Button>
      </form>
    </Box>
  );
}

export default ImageUploader;
