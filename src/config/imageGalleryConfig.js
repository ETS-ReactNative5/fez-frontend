import { PATH_PREFIX } from 'config/general';
const placeholderImage = require('../../public/images/thumbs/image_unavailable.svg');

export default {
    thumbnailImage: {
        defaultImageName: `${PATH_PREFIX === '' ? '/' : ''}${placeholderImage}`,
        defaultImageMimeType: 'image/svg+xml',
        defaultWidth: 150,
        defaultHeight: 150,
        defaultItemsPerRow: 4,
        defaultLazyLoading: true,
    },
    allowedTypes: [
        { viewType: 'Image' },
        { viewType: 'Digilib Image' },
        { viewType: 'Manuscript' },
        { viewType: 'Design', subType: 'Non-NTRO' },
        { viewType: 'Video Document' },
    ],
};
