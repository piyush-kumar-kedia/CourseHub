import 'dart:io';

import 'package:flutter/material.dart';
import 'package:test1/apis/contributions/contribution.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/constants/years_sections.dart';
import 'package:test1/widgets/common/custom_linear_progress.dart';
import 'package:test1/widgets/common/custom_snackbar.dart';
import 'package:test1/widgets/contribute_screen/custom_textformfield.dart';
import 'package:test1/widgets/contribute_screen/dropdown_row.dart';
import 'package:test1/widgets/contribute_screen/upload.dart';

class ContributeScreen extends StatefulWidget {
  final Function(int a) callback;
  const ContributeScreen({super.key, required this.callback});

  @override
  State<ContributeScreen> createState() => _ContributeScreenState();
}

class _ContributeScreenState extends State<ContributeScreen> {
  final _key = GlobalKey<FormState>();

  final _descriptionController = TextEditingController();

  var _course = '';
  var _section = 'Lecture Slides';
  var _year = '2023';
  var color = Colors.black;
  var _isLoading = false;
  File? file;

  void _onCourseChange(dynamic a) {
    _course = a;
  }

  void _onSectionChange(dynamic a) {
    _section = sections[a];
  }

  void _onYearChange(dynamic a) {
    _year = year[a];
  }

  void _onFileUpload(File? fileUpload) {
    if (fileUpload == null) {
      setState(() {
        color = Colors.red;
      });
    } else {
      setState(() {
        color = Colors.black;
      });
      file = fileUpload;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          Padding(
            padding:
                const EdgeInsets.only(top: 30, left: 30, right: 30, bottom: 35),
            child: Form(
              key: _key,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Contribute to CourseHub',
                    style: Themes.darkTextTheme.displayLarge,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  DropdownRow(
                    label: 'COURSE',
                    callback: _onCourseChange,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  DropdownRow(
                    label: 'SECTION',
                    callback: _onSectionChange,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  DropdownRow(
                    label: 'YEAR',
                    callback: _onYearChange,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Text(
                    'DESCRIPTION',
                    style: Themes.darkTextTheme.bodyLarge,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  CustomTextformfield(
                    controller: _descriptionController,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Upload(
                    color: color,
                    callback: _onFileUpload,
                  ),
                  const Spacer(),
                  Material(
                    color: Themes.kYellow,
                    child: InkWell(
                      splashColor: const Color.fromRGBO(0, 0, 0, 0.1),
                      onTap: () async {
            
                        if (_key.currentState!.validate()) {
                          if (file == null) {
                            setState(() {
                              color = Colors.red;
                            });
                            return;
                          } else {
                            try {
                              setState(() {
                                _isLoading = true;
                              });
                              await contributeData(file, _year, _course,
                                  _section, _descriptionController.text);
                              if (!mounted) return;
                              setState(() {
                                _isLoading = false;
                              });
                              showSnackBar(
                                  'You\'ve successfully contributed to CourseHub! 🎉',
                                  context);
                              widget.callback(4);
                            } catch (e) {
                              showSnackBar('Something Went Wrong!', context);
                            }
                          }
                        } else if (file == null) {
                          setState(() {
                            color = Colors.red;
                          });
                        }
                      },
                      child: Container(
                        height: 50,
                        decoration: BoxDecoration(
                            color: Colors.transparent,
                            border:
                                Border.all(color: Colors.black, width: 0.5)),
                        child: Center(
                          child: Text(
                            'SUBMIT',
                            style: Themes.darkTextTheme.bodyLarge,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Visibility(
            visible: _isLoading,
            child: Container(
              color: const Color.fromRGBO(255, 255, 255, 0.9),
              child: const CustomLinearProgress(),
            ),
          )
        ],
      ),
    );
  }
}
