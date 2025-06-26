import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';

// Import components
import CustomLogin from './components/CustomLogin';
import CourseList from './components/courses/CourseList';
import CourseCreate from './components/courses/CourseCreate';
import CourseEdit from './components/courses/CourseEdit';

import SectionList from './components/sections/SectionList';
import SectionCreate from './components/sections/SectionCreate';
import SectionEdit from './components/sections/SectionEdit';

import LessonList from './components/lessons/LessonList';
import LessonCreate from './components/lessons/LessonCreate';
import LessonEdit from './components/lessons/LessonEdit';

import QuizList from './components/quizzes/QuizList';
import QuizCreate from './components/quizzes/QuizCreate';
import QuizEdit from './components/quizzes/QuizEdit';

const App = () => (
  <Admin 
    dataProvider={dataProvider} 
    authProvider={authProvider} 
    loginPage={CustomLogin}
    basename="/admin"
    title="Admin Panel - Instructor"
  >
    <Resource 
      name="courses" 
      list={CourseList} 
      create={CourseCreate} 
      edit={CourseEdit}
      options={{ label: 'Khóa học' }}
    />
    <Resource 
      name="sections" 
      list={SectionList} 
      create={SectionCreate} 
      edit={SectionEdit}
      options={{ label: 'Phần học' }}
    />
    <Resource 
      name="lessons" 
      list={LessonList} 
      create={LessonCreate} 
      edit={LessonEdit}
      options={{ label: 'Bài học' }}
    />
    <Resource 
      name="quizzes" 
      list={QuizList} 
      create={QuizCreate} 
      edit={QuizEdit}
      options={{ label: 'Quiz' }}
    />
  </Admin>
);

export default App;
