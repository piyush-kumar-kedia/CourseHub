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
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    },
    {
      "name": "03. Conics_read only.pptx",
      "id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
      "path": "CE101 - Engineering Design/2020/Slides/",
      "code": "ce101",
      "_id": "63d6334a68f2188184c67f9e"
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: fav.length == 0
          ? Center(
              child: SvgPicture.asset(
                "assets/images/my_profile_no_contri.svg",
                fit: BoxFit.fill,
                alignment: Alignment.center,
              ),
            )
          : Column(
              children: [
                Container(
                  margin: const EdgeInsets.fromLTRB(30, 25, 30, 0),
                  alignment: Alignment.topLeft,
                  child: Text(
                    "FAVOURITES",
                    style: TextStyle(
                        fontFamily: "ProximaNova",
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                        color: Colors.black),
                  ),
                ),
                SizedBox(height: 10.0,),
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.fromLTRB(30, 0, 30, 0),
                    child: Container(
                      child: GridView.builder(
                        itemCount: fav.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 20.0,
                            mainAxisSpacing: 2.0),
                        itemBuilder: (BuildContext context, int index) {
                          String myPath = fav[index]['path'].split("/")[1] + " > " + fav[index]['path'].split("/")[2];
                          return FileCard(
                            index: fav[index]['code'].toUpperCase(),
                            address: myPath,
                            name: fav[index]['name'].length >= 30
                                ? fav[index]['name'].substring(0, 30) +
                                    " ..." +
                                    fav[index]['name'].substring(
                                        fav[index]['name'].length - 4,
                                        fav[index]['name'].length)
                                : fav[index]['name'],
                          );
                        },
                      ),
                    ),
                  ),
                ),
                fav.length <= 2
                    ? Container(
                        transform: Matrix4.translationValues(0, 12, 0),
                        margin: const EdgeInsets.fromLTRB(30, 16, 30, 0),
                        child: SvgPicture.asset(
                          "assets/g10.svg",
                          alignment: Alignment.center,
                        ),
                      )
                    : Column(),
              ],
            ),
    );
  }
}
