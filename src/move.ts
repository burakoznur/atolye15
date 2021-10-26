// Please update this type as same as with the data shape.
type List = Folder[];

// Define Folder model
type Folder = {
  id: string;
  name: string;
  files: File[];
};

// Define File model
type File = {
  id: string;
  name: string;
};

export default function move(list: List, source: string, destination: string): List {
  // Define control and index parameters
  let isSourceFound = false;
  let folderIndexToChange = -1;
  let fileIndexToChange = -1;
  let destinationIndex = -1;
  // Control List
  list.forEach((obFolder: Folder, folderIndex: number) => {
    // Check destination folder is valid. If it is valid, update destinationIndex
    if (obFolder.id === destination) {
      destinationIndex = folderIndex;
    }
    // If found index of source and destination, end loop
    if (isSourceFound === true && destinationIndex !== -1) {
      return;
    }
    obFolder.files.forEach((obFile: File, fileIndex: number) => {
      // Check source file is valid. If it is valid, update isSourceFound, folderIndexToChange and fileIndexToChange
      if (obFile.id === source) {
        isSourceFound = true;
        folderIndexToChange = folderIndex;
        fileIndexToChange = fileIndex;
      }
    });
  });
  if (isSourceFound !== false) {
    // If source and destination are found, send modified list.
    if (destinationIndex === -1) {
      throw new Error('You cannot specify a file as the destination');
    } else {
      list[destinationIndex].files.push(list[folderIndexToChange].files[fileIndexToChange]);
      list[folderIndexToChange].files.splice(fileIndexToChange, 1);
      return list;
    }
  } else {
    // Send error, if source file is not found
    throw new Error('You cannot move a folder');
  }
}
