import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class FileCard extends StatelessWidget {
  String index;
  String address;
  String name;
  FileCard({super.key, required this.index, required this.address,required this.name});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          child: Container(
            child: SvgPicture.asset(
              "assets/Group2658.svg",
              matchTextDirection: false,
            ),
          ),
        ),
        Positioned(
          top: 20,
          left: 10,
          child: Text("$address",
              style: TextStyle(
                  fontFamily: "Proxima Nova",
                  fontSize: 12,
                  fontWeight: FontWeight.w400,
                  color: Colors.black)),
        ),
        Positioned(
          top: 40,
          left: 10,
          child: Text("$name",
              style: TextStyle(
                  fontFamily: "Proxima Nova",
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: Colors.black)),
        ),
       
         Positioned(
          top:80,
          left:80,
          child: SizedBox(
            width: 100,
            child: Text("$index",
                textAlign: TextAlign.justify,
                style: TextStyle(
                  fontFamily: "Proxima Nova",
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: Color.fromRGBO(0,0,0,0.25 ),
                )),
          ),
        )
      
      ],
    );
    ;
  }
}
