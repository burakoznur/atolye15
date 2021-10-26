"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function move(list, source, destination) {
    // Define control and index parameters
    let isSourceFound = false;
    let folderIndexToChange = -1;
    let fileIndexToChange = -1;
    let destinationIndex = -1;
    // Control List
    list.forEach((obFolder, folderIndex) => {
        // Check destination folder is valid. If it is valid, update destinationIndex
        if (obFolder.id === destination) {
            destinationIndex = folderIndex;
        }
        // If found index of source and destination, end loop
        if (isSourceFound === true && destinationIndex !== -1) {
            return;
        }
        obFolder.files.forEach((obFile, fileIndex) => {
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
        }
        else {
            list[destinationIndex].files.push(list[folderIndexToChange].files[fileIndexToChange]);
            list[folderIndexToChange].files.splice(fileIndexToChange, 1);
            return list;
        }
    }
    else {
        // Send error, if source file is not found
        throw new Error('You cannot move a folder');
    }
}
exports.default = move;
//# sourceMappingURL=move.js.map