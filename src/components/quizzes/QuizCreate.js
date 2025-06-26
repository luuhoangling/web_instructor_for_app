import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from 'react-admin';

const QuizCreate = (props) => (
  <Create {...props} title="Tạo quiz mới">
    <SimpleForm>
      <TextInput 
        source="title" 
        label="Tiêu đề quiz" 
        validate={required()} 
        fullWidth
      />
      <TextInput 
        source="description" 
        label="Mô tả quiz" 
        multiline 
        rows={3}
        fullWidth
      />
      
      <ArrayInput source="questions" label="Câu hỏi" validate={required()}>
        <SimpleFormIterator>
          <TextInput 
            source="question_text" 
            label="Câu hỏi" 
            validate={required()} 
            fullWidth
          />
          <ArrayInput source="options" label="Các lựa chọn">
            <SimpleFormIterator>
              <TextInput 
                source="text" 
                label="Nội dung lựa chọn" 
                validate={required()} 
                fullWidth
              />
              <TextInput 
                source="value" 
                label="Giá trị" 
                validate={required()}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput 
            source="correct_option" 
            label="Đáp án đúng" 
            validate={required()}
            helperText="Nhập giá trị của lựa chọn đúng"
          />
          <TextInput 
            source="explanation" 
            label="Giải thích" 
            multiline 
            rows={2}
            fullWidth
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default QuizCreate;
