/* eslint-disable class-methods-use-this */
const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
  async store(request, response) {
    const box = await Box.findById(request.params.id);

    const file = await File.create({
      title: request.file.originalname,
      path: request.file.filename,
    });

    box.files.push(file);

    await box.save();

    // eslint-disable-next-line no-underscore-dangle
    request.io.sockets.in(box._id).emit('file', file);

    return response.json(file);
  }
}

module.exports = new FileController();
