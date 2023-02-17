
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/widgets/course_card.dart';

class Favourites extends StatelessWidget {
  Favourites({
    Key? key,
  }) : super(key: key);

  List<String> branches = ['eee', 'chemical','chemical','chemical'];
  List<String> address = ['Exams>Quiz1','Exams>Quiz2','Exams>Quiz3','Exams>Quiz4'];
  List<String> name = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
      children: [
        Expanded(
          flex: 3,
          child: Container(
              margin: const EdgeInsets.fromLTRB(30, 60, 0, 0),
              alignment: Alignment.topLeft,
              child: Text("FAVOURITES",
                  style: TextStyle(
                      fontFamily: "Proxima Nova",
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: Colors.black))),
        ),
        Expanded(
          flex: 12,
          child: Container(
              padding: EdgeInsets.all(30.0),
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 4.0,
                    mainAxisSpacing: 4.0),
                itemBuilder: (BuildContext context, int index) {
                  return CourseCard(
                      index: branches[index], address: address[index],name: name[index],);
                },
              )),
        ),
        Expanded(flex: 10, child: Container())
      ],
    ));
  }
}
