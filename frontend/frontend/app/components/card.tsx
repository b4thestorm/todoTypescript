import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/joy/Chip';

export default function ActionAreaCard()  {
    const todo = {id: 1, message: "get a job", status: "doing"}
  return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {todo.message}
                </Typography>
                <Chip>{todo.status}</Chip>;
              </CardContent>
            </CardActionArea>
          </Card>
   
  );
}