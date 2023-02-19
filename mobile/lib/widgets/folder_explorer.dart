import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class FolderExplorer extends StatelessWidget {
  final Map<String, dynamic> data;
  final Function(String) callback;
  const FolderExplorer({super.key, required this.data, required this.callback});

  @override
  Widget build(BuildContext context) {
    if (data["childType"] == "Folder") {
      List<Widget> folders = [];
      for (var e in data["children"]) {
        folders.add(
          Ink(
            child: InkWell(
              onTap: () => callback(e["name"]),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Stack(
                  children: [
                    SvgPicture.asset(
                      "assets/folder.svg",
                      width: double.infinity,
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(16.0, 20.0, 0, 0),
                      child: Text(
                        e["name"],
                        style: TextStyle(
                          fontFamily: "ProximaNova",
                          fontSize: 18.0,
                          fontWeight: FontWeight.w700,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      }
      return Padding(
        padding: const EdgeInsets.all(8.0),
        child: GridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 0.0,
          mainAxisSpacing: 0.0,
          childAspectRatio: 1.25,
          shrinkWrap: true,
          children: folders,
        ),
      );
    } else {
      return ListView.builder(
        itemCount: data["children"].length,
        itemBuilder: (context, index) {
          String name = data["children"][index]["name"];

          return Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Row(
                  children: [
                    SizedBox(
                      width: 12.0,
                    ),
                    Container(
                      width: 30.0,
                      height: 40.0,
                      color: Color(0xFFD9D9D9),
                    ),
                    SizedBox(
                      width: 12.0,
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            name,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontFamily: "ProximaNova",
                              fontWeight: FontWeight.w500,
                              fontSize: 18.0,
                              color: Colors.black,
                            ),
                          ),
                          SizedBox(
                            height: 4.0,
                          ),
                          Row(
                            children: [
                              Text(
                                "PDF",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontWeight: FontWeight.w400,
                                  fontSize: 14.0,
                                  color: Color(0xFF585858),
                                ),
                              ),
                              SizedBox(
                                width: 8.0,
                              ),
                              Text(
                                "by",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontWeight: FontWeight.w400,
                                  fontSize: 14.0,
                                  color: Color(0xFF585858),
                                ),
                              ),
                              SizedBox(
                                width: 4.0,
                              ),
                              Text(
                                "Atharva Tagalpallewar",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontWeight: FontWeight.w400,
                                  fontSize: 14.0,
                                  color: Color(0xFF585858),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Icon(Icons.arrow_downward),
                    SizedBox(
                      width: 4.0,
                    ),
                    Icon(Icons.more_vert),
                    SizedBox(
                      width: 12.0,
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                height: 1.0,
                color: Colors.black,
              ),
            ],
          );
        },
      );
    }
  }
}
