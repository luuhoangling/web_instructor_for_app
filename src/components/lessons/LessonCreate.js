import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin';

const LessonCreate = (props) => (
  <Create {...props} title="Tạo bài học mới">
    <SimpleForm>
      <ReferenceInput source="course_id" reference="courses" label="Khóa học" validate={required()}>
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="section_id" reference="sections" label="Phần học" validate={required()}>
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput 
        source="title" 
        label="Tiêu đề bài học" 
        validate={required()} 
        fullWidth
      />
      <TextInput 
        source="description" 
        label="Mô tả bài học" 
        multiline 
        rows={3}
        fullWidth
      />
      <SelectInput 
        source="content_type" 
        label="Loại nội dung"
        choices={[
          { id: 'video', name: 'Video' },
          { id: 'text', name: 'Văn bản' },
          { id: 'document', name: 'Tài liệu' },
          { id: 'quiz', name: 'Bài kiểm tra' },
        ]}
        validate={required()}
      />
      <TextInput 
        source="content_url" 
        label="URL nội dung" 
        fullWidth
      />
      <TextInput 
        source="content_text" 
        label="Nội dung văn bản" 
        multiline 
        rows={5}
        fullWidth
      />
      <NumberInput 
        source="duration" 
        label="Thời lượng (phút)" 
      />
      <NumberInput 
        source="order_index" 
        label="Thứ tự" 
        validate={required()}
      />
      <NumberInput 
        source="file_size" 
        label="Kích thước file (bytes)" 
      />
      <BooleanInput 
        source="is_free" 
        label="Miễn phí" 
      />
      <BooleanInput 
        source="can_preview" 
        label="Cho phép xem trước" 
      />
    </SimpleForm>
  </Create>
);

export default LessonCreate;
