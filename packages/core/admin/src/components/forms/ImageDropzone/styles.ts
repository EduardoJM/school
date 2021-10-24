import { styled, Box } from '@mui/material';

export const ImageDropzoneContainer = styled(Box)(({ theme }) => ({
    height: 200,
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'dashed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

export interface ImagePreviewProps {
    src: string;
}

export const ImagePreview = styled(Box)<ImagePreviewProps>(({ theme, src }) => ({
    width: 150,
    height: 150,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPOsition: 'center',
}));
