import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin';

const SectionEdit = (props) => (
  <Edit {...props} title="Chỉnh sửa phần học">
    <SimpleForm>
      <ReferenceInput source="course_id" reference="courses" label="Khóa học" validate={required()}>
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput 
        source="title" 
        label="Tiêu đề phần" 
        validate={required()} 
        fullWidth
      />
      <TextInput 
        source="description" 
        label="Mô tả phần" 
        multiline 
        rows={4}
        fullWidth
      />
      <NumberInput 
        source="order_index" 
        label="Thứ tự" 
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default SectionEdit;
