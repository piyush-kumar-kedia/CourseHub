import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';

class FolderExplorer extends StatelessWidget {
  final Map<dynamic, dynamic> data;
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
                      "assets/folder_card.svg",
                      width: double.infinity,
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(16.0, 20.0, 0, 0),
                      child: Text(
                        e["name"],
                        style: const TextStyle(
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
                    const SizedBox(
                      width: 12.0,
                    ),
                    Container(
                      width: 30.0,
                      height: 40.0,
                      color: const Color(0xFFD9D9D9),
                    ),
                    const SizedBox(
                      width: 12.0,
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            name,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontFamily: "ProximaNova",
                              fontWeight: FontWeight.w500,
                              fontSize: 18.0,
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(
                            height: 4.0,
                          ),
                          Row(
                            children: const [
                              Text(
                                "PDF", //TODO
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
                                "Atharva Tagalpallewar", //TODO
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
                    GestureDetector(
                        onTap: () {
                           //TODO
                        },
                        child: const Icon(
                          Icons.arrow_downward,
                          size: 30.0,
                          color: Color(
                              0x7F000000), // TODO change colour on download
                        )),
                    PopupMenuButton(
                      splashRadius: 1,
                      icon: const Icon(
                        Icons.more_vert,
                        size: 30.0,
                      ),
                      onSelected: (value) {
                        if (value == '/fav') {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              action: SnackBarAction(
                                label: "UNDO",
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                          behavior: SnackBarBehavior.floating,
                                          margin:
                                              EdgeInsets.only(bottom: 125.0),
                                          duration: Duration(seconds: 1),
                                          content: Text('UNDO SUCCESSFUL!')));
                                },
                              ),
                              behavior: SnackBarBehavior.floating,
                              margin: const EdgeInsets.only(bottom: 125.0),
                              duration: const Duration(seconds: 1),
                              content: const Text('Added to Favourites!'),
                            ),
                          );
                          // TODO
                        } else if (value == '/share') {
                          String link = "link";
                          Clipboard.setData(ClipboardData(
                            text: link,
                          )).then((_) {
                            ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                    behavior: SnackBarBehavior.floating,
                                    margin: EdgeInsets.only(bottom: 125.0),
                                    duration: Duration(seconds: 1),
                                    content: Text(
                                        'Share link copied to your clipboard!')));
                          });
                          // TODO
                        }
                      },
                      itemBuilder: (BuildContext bc) {
                        return [
                          PopupMenuItem(
                            value: '/fav',
                            child: Row(
                              children: const [
                                Text("Favourite"),
                                Spacer(),
                                Icon(
                                  Icons.star,
                                  size: 30.0,
                                  color: Color(0x7F000000),
                                ),
                              ],
                            ),
                          ),
                          PopupMenuItem(
                            value: '/share',
                            child: Row(
                              children: const [
                                Text("Share"),
                                Spacer(),
                                Icon(
                                  Icons.share,
                                  size: 30.0,
                                ),
                              ],
                            ),
                          ),
                        ];
                      },
                    ),
                    const SizedBox(
                      width: 10.0,
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
