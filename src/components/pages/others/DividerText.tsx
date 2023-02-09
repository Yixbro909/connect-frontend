import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));


interface IProps {
    text: string
}
export const DividerText: React.FC<IProps> = ({ text }) => {
    return (
        <Root>
            <Divider>
                <Chip label={text} />
            </Divider>
        </Root>
    );
}

