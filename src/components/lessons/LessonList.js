import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin';

const LessonList = (props) => (
  <List {...props} title="Danh sách bài học">
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Tiêu đề bài học" />
      <TextField source="content_type" label="Loại nội dung" />
      <ReferenceField source="section_id" reference="sections" label="Phần học">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="course_id" reference="courses" label="Khóa học">
        <TextField source="title" />
      </ReferenceField>
      <NumberField source="duration" label="Thời lượng (phút)" />
      <NumberField source="order_index" label="Thứ tự" />
      <BooleanField source="is_free" label="Miễn phí" />
      <BooleanField source="can_preview" label="Xem trước" />
      <DateField source="created_at" label="Ngày tạo" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default LessonList;
