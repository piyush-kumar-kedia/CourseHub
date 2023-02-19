import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class FileCard extends StatelessWidget {
  String index;
  String address;
  String name;
  FileCard(
      {super.key,
      required this.index,
      required this.address,
      required this.name});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SvgPicture.asset(
          'assets/Group 2658.svg',
          alignment: Alignment.center,
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
        ),

        Positioned(
          top:24,
          left:12,
          child: Column(
          children:[
             SizedBox(
              width:120,
              child: Text("$address",
                  style: TextStyle(
                      fontFamily: "ProximaNova",
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                      color: Colors.black)),
            ),
             SizedBox(height: 2.0,),

             SizedBox(
              width:120,
              child: Text("$name",
                  style: TextStyle(
                      fontFamily: "ProximaNova",
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: Colors.black)),
            ),

          ]
          ),
        ),
        Positioned(
          bottom: 24,
          right:16,
          child: SizedBox(
            width: 100,
            child: Text("$index",
                textAlign: TextAlign.right,
                style: TextStyle(
                  fontFamily: "ProximaNova",
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: Color.fromRGBO(0, 0, 0, 0.25),
                )),
          ),
        )
      ],
    );
    ;
  }
}

class Contribute extends StatefulWidget {
  const Contribute({Key? key}) : super(key: key);

  @override
  State<Contribute> createState() => _ContributeState();
}

class _ContributeState extends State<Contribute> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}

