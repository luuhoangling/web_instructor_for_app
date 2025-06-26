import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

const CourseList = (props) => (
  <List {...props} title="Danh sách khóa học">
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tên khóa học" />
      <TextField source="description" label="Mô tả" />
      <TextField source="level" label="Cấp độ" />
      <NumberField source="price" label="Giá" />
      <NumberField source="discount_price" label="Giá giảm" />
      <NumberField source="student_count" label="Số học viên" />
      <NumberField source="rating" label="Đánh giá" />
      <BooleanField source="is_published" label="Đã xuất bản" />
      <BooleanField source="is_featured" label="Nổi bật" />
      <DateField source="created_at" label="Ngày tạo" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default CourseList;
