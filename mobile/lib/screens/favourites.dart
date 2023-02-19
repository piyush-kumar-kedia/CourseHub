
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/widgets/file_card.dart';

class Favourites extends StatelessWidget {
  Favourites({
    Key? key,
  }) : super(key: key);
  var fav = <Map>[
    {
      "name": "02_Tutorial 5_Monday_AL1_Lab group 8.docx",
      "id": "01OXYV3754ESP2EMFC6VB2E6QI6BKEJSFH",
      "path": "CE101/2020/Tutorials/",
      "code": "CE101",
      "_id": "63c033fd5e59fd2129fa1dd5"
    },
    {
      "name": "01 Lettering and dimensioning.pdf",
      "id": "01OXYV37ZE4E7SGVKYURDJAMAYI2S25OBN",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334968f2188184c67f96"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    }
  ];
  List<String> branches = [];
  List<String> address = ['Exams>Quiz1','Exams>Quiz2','Exams>Quiz3','Exams>Quiz4','Exams>Quiz3','Exams>Quiz4'];
  List<String> name = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4','Quiz 3', 'Quiz 4'];
  String svg_image1 = "a";

  String _setImage() {

    if(fav.length <= 4 && fav.length >= 1) {
      svg_image1 = "assets/g10.svg";
    }
    else if(fav.length == 0) {
      svg_image1 = "assets/g10.svg";
    }
    else {
      svg_image1 = "a";
    }
    return svg_image1;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: fav.length <= 4 && fav.length > 0
          ? Column(
              children: [
                fav.length <= 4 && fav.length > 0
                    ? Container(
                        margin: const EdgeInsets.fromLTRB(30, 60, 30, 0),
                        alignment: Alignment.topLeft,
                        child: Text("FAVOURITES",
                            style: TextStyle(
                                fontFamily: "ProximaNova",
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: Colors.black)))
                    : Column(),
                fav.length <= 4 && fav.length > 0
                    ? Expanded(
                        child: Padding(
                          padding: EdgeInsets.fromLTRB(30, 0, 30, 0),
                          child: Container(
                              child: GridView.builder(
                            itemCount: fav.length,
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 2,
                                    crossAxisSpacing: 20.0,
                                    mainAxisSpacing: 2.0),
                                   itemBuilder: (BuildContext context, int index) {
                               return FileCard(
                                index: fav[index]['code'].toUpperCase(),
                                address: fav[index]['path'].replaceAll("/"," > "),
                                name: fav[index]['name'].length >= 30 ? fav[index]['name'].substring(0,30)+" ..."+fav[index]['name'].substring(fav[index]['name'].length-4,fav[index]['name'].length):fav[index]['name'],
                              );
                            },
                          )),
                        ),
                      )
                    : Column(),
                fav.length <= 4 && fav.length >= 0
                    ? Column(
                        children: [
                          fav.length <= 4 && fav.length > 0
                              ? SizedBox(
                                  width: 250,
                                  child: Text(
                                      "some text here some text here some text here some text here some text here some text here",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                          fontFamily: "ProximaNova",
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: Color(0xff6C6C6C))),
                                )
                              : Column(),
                          fav.length <= 4 && fav.length > 0
                              ? Container(
                                  transform:
                                      Matrix4.translationValues(0, 12, 0),
                                  margin:
                                      const EdgeInsets.fromLTRB(30, 16, 30, 0),
                                  child: SvgPicture.asset(
                                    _setImage(),
                                    alignment: Alignment.center,
                                  ),
                                )
                              : Column()
                        ],
                      )
                    : Column(),
              ],
            )
          : Center(
              child: SvgPicture.asset(
                _setImage(),
                fit: BoxFit.fill,
                alignment: Alignment.center,
              ),
            ),
    );
  }
}
