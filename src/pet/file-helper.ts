export class FileHelper {
    static customFileName(req, file, cb): void {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        let fileExtension = '';
        if (file.mimetype.indexOf('jpeg') > -1) {
            fileExtension = 'jpeg';
        } else if (file.mimetype.indexOf('png') > -1) {
            fileExtension = 'png';
        }
        const originalName = file.originalname.split('.')[0];
        cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
    }

    static destinationPath(req, file, cb) {
        cb(null, 'C:\\Users\\lazar\\Desktop\\nest\\pet-network\\uploaded\\');
    }

    static fileFilter(req, file, cb): void {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}
