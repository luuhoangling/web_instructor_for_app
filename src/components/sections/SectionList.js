import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

const SectionList = (props) => (
  <List {...props} title="Danh sách phần học">
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tiêu đề phần" />
      <TextField source="description" label="Mô tả" />
      <ReferenceField source="course_id" reference="courses" label="Khóa học">
        <TextField source="title" />
      </ReferenceField>
      <NumberField source="order_index" label="Thứ tự" />
      <NumberField source="total_lessons" label="Số bài học" />
      <NumberField source="total_duration" label="Tổng thời lượng (phút)" />
      <DateField source="created_at" label="Ngày tạo" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default SectionList;
