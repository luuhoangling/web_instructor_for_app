import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  SelectInput,
} from 'react-admin';

const CourseEdit = (props) => (
  <Edit {...props} title="Chỉnh sửa khóa học">
    <SimpleForm>
      <TextInput 
        source="title" 
        label="Tên khóa học" 
        validate={required()} 
        fullWidth
      />
      <TextInput 
        source="subtitle" 
        label="Phụ đề" 
        fullWidth
      />
      <TextInput 
        source="description" 
        label="Mô tả" 
        multiline 
        rows={4}
        fullWidth
      />
      <SelectInput 
        source="level" 
        label="Cấp độ"
        choices={[
          { id: 'beginner', name: 'Người mới bắt đầu' },
          { id: 'intermediate', name: 'Trung cấp' },
          { id: 'advanced', name: 'Nâng cao' },
        ]}
      />
      <NumberInput source="price" label="Giá" />
      <NumberInput source="discount_price" label="Giá giảm" />
      <TextInput source="thumbnail_url" label="URL ảnh thumbnail" fullWidth />
      <TextInput source="preview_video_url" label="URL video giới thiệu" fullWidth />
      <TextInput source="requirements" label="Yêu cầu" multiline rows={3} fullWidth />
      <TextInput source="what_you_learn" label="Học được gì" multiline rows={3} fullWidth />
      <BooleanInput source="is_published" label="Xuất bản" />
      <BooleanInput source="is_featured" label="Đánh dấu nổi bật" />
      
      <ArrayInput source="sections" label="Phần học">
        <SimpleFormIterator>
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
            fullWidth
          />
          
          <ArrayInput source="lessons" label="Bài học">
            <SimpleFormIterator>
              <TextInput 
                source="title" 
                label="Tiêu đề bài" 
                validate={required()} 
                fullWidth
              />
              <TextInput 
                source="description" 
                label="Mô tả bài học" 
                multiline 
                fullWidth
              />
              <SelectInput 
                source="content_type" 
                label="Loại nội dung"
                choices={[
                  { id: 'video', name: 'Video' },
                  { id: 'text', name: 'Văn bản' },
                  { id: 'document', name: 'Tài liệu' },
                ]}
              />
              <TextInput source="content_url" label="URL nội dung" fullWidth />
              <TextInput source="content_text" label="Nội dung văn bản" multiline fullWidth />
              <NumberInput source="duration" label="Thời lượng (phút)" />
              <BooleanInput source="is_free" label="Miễn phí" />
              <BooleanInput source="can_preview" label="Cho phép xem trước" />
              
              <ArrayInput source="quizzes" label="Quiz">
                <SimpleFormIterator>
                  <TextInput 
                    source="question" 
                    label="Câu hỏi" 
                    validate={required()} 
                    fullWidth
                  />
                  <TextInput 
                    source="answer" 
                    label="Đáp án đúng" 
                    validate={required()} 
                    fullWidth
                  />
                  <TextInput 
                    source="explanation" 
                    label="Giải thích" 
                    multiline 
                    fullWidth
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default CourseEdit;
