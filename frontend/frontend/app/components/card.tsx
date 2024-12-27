import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/joy/Chip';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function ActionAreaCard({todo})  {
  return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
              <CardMedia>
                <TextareaAutosize></TextareaAutosize>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.message}
                </Typography>
                <Chip>{todo.status}</Chip>
              </CardContent>
            </CardActionArea>
          </Card>
   
  );
}