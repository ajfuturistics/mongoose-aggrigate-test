# About

- Tech Stack: React, Vite, Tailwind CSS, NodeJs, Express,mongodb

- Collection name: student_mst (direct entry in database when project
  start)
  First Name, Last Name, Mobile, Email

- Collection name: Subject_mst (direct entry in database when project
  start)
  Subject Name, Status(active, inactive)

- Collection name: Marks_mst (need to add from front)
  studentId, SubjectId, Marks

You have to make only 2 API with POST METHOD

1.  Add Marks

    - Parameters:
      studentId: (id from student collection,required)
      subjectId: (id from subject collection,required, Only status = active)
      marks: (insert only number,required, max 100)

2.  Report

    - Columns Name:Full Name, Total Subject, Total Marks, Average, Rank.
    - Parameters Search:
      studentName: (Optional, Can serach with first name or last name or full
      name)
      SubjectId: (Optional, id from subject collection)
      AverageStart: (Optional, insert only number,min 0, max 100)
      AverageEnd: (Optional, insert only number,min 0, max 100)

    Output:

    - All Parameters are Optional, if i send any of the parametor then response should come with filtered student data.

    - If i request with blank parameter than send all student details in response.
