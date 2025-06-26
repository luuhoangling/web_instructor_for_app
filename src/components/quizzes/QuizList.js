import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

const QuizList = (props) => (
  <List {...props} title="Danh sách quiz">
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tiêu đề quiz" />
      <TextField source="description" label="Mô tả" />
      <DateField source="created_at" label="Ngày tạo" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default QuizList;
