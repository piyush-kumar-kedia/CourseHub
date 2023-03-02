import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ContributeScreen extends StatefulWidget {
  const ContributeScreen({Key? key}) : super(key: key);

  @override
  State<ContributeScreen> createState() => _ContributeScreenState();
}
class _ContributeScreenState extends State<ContributeScreen> {
  FilePickerResult? result;
  UniqueKey key = UniqueKey();
  String dropdownValue = '2023';
  String dropdownValue2 = 'Exams';
  final myController = TextEditingController();
  final myController2 = TextEditingController();
  bool _validate1=false,_validate2=false;
  void _showcontent() {
    setState(() {
      myController.text.isEmpty ? _validate1 = true : _validate1 = false;
    });
    setState(() {
      myController2.text.isEmpty ? _validate2 = true : _validate2 = false;
    });

    if(_validate1 == false &&_validate2 == false)
    () async {
      final body = jsonEncode({
        'contributionId': key.toString(),
        'year': dropdownValue,
        'uploadedBy': '63f1f791ecc71171506ef609',
        'courseCode': myController.text,
        'folder': dropdownValue2,
        'approved': false,
        'description': myController2.text,});
      final url = Uri.https('www.coursehubiitg.in', 'api/contribution');
      final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json'},
          body: body
      );
      print('Response body: ${response.body}');
    };
  }

  @override
  Widget build(BuildContext context) {
    print(key);
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                margin: const EdgeInsets.fromLTRB(30, 50, 30, 0),
                alignment: Alignment.topLeft,
                child: const Text("Contribute To CourseHub",
                    style: TextStyle(
                        fontFamily: "ProximaNova",
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: Colors.black))),
            Padding(
              padding: const EdgeInsets.fromLTRB(0,20,0,0),
              child: Row(
                mainAxisSize: MainAxisSize.max,
                  children:[
                    const Expanded(
                      flex:6,
                      child: Padding(
                          padding: EdgeInsets.fromLTRB(30,10,0,0),
                          child: Text("COURSE",
                              style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontSize: 14,
                                  fontWeight: FontWeight.w700,
                                  color: Colors.black))
                      ),
                    ),
                    Expanded(
                      flex:16,
                      child: Padding(
                        padding: EdgeInsets.fromLTRB(10,10,30,0),
                          child: Container(
                            child: TextField(
                              controller: myController,
                              decoration: InputDecoration(
                                contentPadding: EdgeInsets.all(24),
                                focusedBorder: OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.green, width: 0.6),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.black, width: 0.6),
                                ),
                                hintText: 'Eg. MA101',
                                errorText: _validate1 ? 'Course Name can\'t Be Empty' : null,
                              ),
                            ),
                          ),
                      ),
                    ),

                  ]),
            ),
            Row(
                mainAxisSize: MainAxisSize.max,
                children:[
                  Expanded(
                    flex:6,
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(30,20,0,0),
                        child: Text("SECTION",
                            style: TextStyle(
                                fontFamily: "ProximaNova",
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: Colors.black))
                    ),
                  ),

                  Expanded(
                    flex:16,
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(10,20,30,0),
                      child: DropdownButtonFormField<String>(
                        value: dropdownValue2,
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.black, width: 0.6),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.black, width: 0.6),
                          ),
                        ),
                          isExpanded: true,
                          isDense: true,
                          items: <String>['Lecture Slides', 'Tutorials', 'Exams', 'Notes','Assignments']
                            .map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(
                              value,
                              style: TextStyle(fontSize: 14,fontFamily: "ProximaNova",),
                            ),
                          );
                        }).toList(),
                        onChanged: (String? newValue) {
                          setState(() {
                            dropdownValue2 = newValue!;
                          });
                        },
                      ),

                    ),
                  ),

                ]),
            Row(
                mainAxisSize: MainAxisSize.max,
                children:[
                  Expanded(
                    flex:6,
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(30,20,0,0),
                        child: Text("YEAR",
                            style: TextStyle(
                                fontFamily: "ProximaNova",
                                fontSize: 14,
                                fontWeight: FontWeight.w700,
                                color: Colors.black))
                    ),
                  ),

                  Expanded(
                    flex:16,
                    child: Padding(
                      padding: EdgeInsets.fromLTRB(10,20,30,0),
                      child: DropdownButtonFormField<String>(
                        itemHeight: 48,
                        value: dropdownValue,
                        decoration: InputDecoration(
                          enabledBorder: OutlineInputBorder( //<-- SEE HERE
                            borderSide: BorderSide(color: Colors.black, width: 0.6),
                          ),
                          focusedBorder: OutlineInputBorder( //<-- SEE HERE
                            borderSide: BorderSide(color: Colors.black, width: 0.6),
                          ),
                        ),
                        isExpanded: true,
                        items: <String>['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023']
                            .map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(
                              value,
                              style: TextStyle(fontSize: 14,fontFamily: "ProximaNova",),
                            ),
                          );
                        }).toList(),
                        // Step 5.
                        onChanged: (String? newValue) {
                          setState(() {
                            dropdownValue = newValue!;
                          });
                        },
                      ),
                    ),
                  ),

                ]),
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                  padding: const EdgeInsets.fromLTRB(30,30,30,0),
                  child: Text("DESCRIPTION",
                      style: TextStyle(
                          fontFamily: "ProximaNova",
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: Colors.black))),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(30,20,30,20),
              child: TextField(
                  controller: myController2,
                decoration: InputDecoration(
                  contentPadding: EdgeInsets.all(8),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.green, width: 0.6),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.black, width: 0.6),
                  ),
                  labelText: 'Describe your files',
                    errorText: _validate2 ? 'Description can\'t Be Empty.' : null,
                ),
                style: TextStyle(fontSize: 14),
                maxLines: 5,
                minLines: 4,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(30.0,12,30,0),
              child: SizedBox(
                height: 100,
                width: double.infinity,
                child: TextButton(
                  child: Text('UPLOAD YOUR FILES'),
                  style: ElevatedButton.styleFrom(
                    foregroundColor:Color(0xff000000) ,
                    side: BorderSide(
                      width: 0.5,
                    ),
                    shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(0.0)),
                    textStyle: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        fontFamily: "ProximaNova"),
                  ),
                    onPressed: () async {
                      result = await FilePicker.platform.pickFiles(allowMultiple: true);
                      if (result == null) {
                        print("No file selected");
                      } else {
                        setState(() {});
                        result?.files.forEach((element) {
                          print(element.name);
                        });
                      }}
                ),
              ),
            ),
            if(result != null)
              Padding(
                padding: const EdgeInsets.fromLTRB(30.0,20,30,0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Selected file(s):', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700),),
                    ListView.builder(
                        shrinkWrap: true,
                        itemCount: result?.files.length ?? 0,
                        itemBuilder: (context, index) {
                          return Text(result?.files[index].path ?? '', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w400));
                        })
                  ],
                ),),
            Column(
              children:[
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(30.0,30,30,30),
                    child: SizedBox(
                     height: 44,
                      width: double.infinity,
                      child: TextButton(
                        child: Text('SUBMIT'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xffFECF6F),
                              foregroundColor:Color(0xff000000) ,
                             side: BorderSide(
                               width: 0.5,
                              ),
                              shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(0.0)),
                              textStyle: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              fontFamily: "ProximaNova"),
                        ),
                        onPressed: _showcontent ,

                      ),
                    ),
                  ),
                ),],
            ),
        ],
    ),
      ));
  }
}
