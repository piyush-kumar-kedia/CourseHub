import 'package:flutter/material.dart';

class ContributionCard extends StatefulWidget {
   const ContributionCard({Key? key}) : super(key: key);

  @override
  State<ContributionCard> createState() => _ContributionCardState();
}

class _ContributionCardState extends State<ContributionCard> {
  final String courseName = "CL303";

  final int year = 2022;

  final String contextType = "Lecture Slides";

  String description = "Description description description cription description Descrip Descripcription description Description description descriptionDescription description description";

  String contriStatus = "APPROVED";

  // TODO set format of date
  String date = DateTime.now().toString().substring(0,19);

  void setDesc(){
    if(description.length>100){
      description = description.substring(0,100);
    }
  }

    @override

  Widget build(BuildContext context) {
    setDesc();
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(0),
      ),
      color: const Color(0xffFECF6F),
      child: Container(
        alignment: Alignment.topLeft,
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 9),
        child: Column(
          children: [
            Container(
              alignment: Alignment.topLeft,
              padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 0),
              child: Row(
                children: [
                  Text(
                    courseName,
                    style: const TextStyle(
                      fontFamily: 'Proxima Nova',
                      fontWeight: FontWeight.w700,
                      fontSize: 13,
                    ),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(2, 0, 2, 0)),
                  const Icon(
                    size: 13,
                    Icons.arrow_forward_ios_rounded,
                    color: Colors.black,
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(2, 0, 2, 0)),
                  Text(
                    year.toString(),
                    style: const TextStyle(
                      fontFamily: 'Proxima Nova',
                      fontWeight: FontWeight.w700,
                      fontSize: 13,
                    ),
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(2, 0, 2, 0)),
                  const Icon(
                    size: 13,
                    Icons.arrow_forward_ios_rounded,
                    color: Colors.black,
                  ),
                  const Padding(padding: EdgeInsets.fromLTRB(2, 0, 2, 0)),
                  Text(
                    contextType,
                    style: const TextStyle(
                      fontFamily: 'Proxima Nova',
                      fontWeight: FontWeight.w700,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              alignment: Alignment.topLeft,
              padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
              child: Text(
                '$description...',
                style: const TextStyle(
                  fontFamily: 'Proxima Nova',
                  fontWeight: FontWeight.w400,
                  fontSize: 12,
                ),
              ),
            ),
            Row(
              children: [
                Text(
                  date.toString(),
                  style: const TextStyle(
                    fontFamily: 'Proxima Nova',
                    fontWeight: FontWeight.w400,
                    fontSize: 12,
                  ),
                ),
                const Spacer(),
                TextButton(onPressed: () {  },
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 20),
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(0)),
                    ),
                  ),
                  child: Text(
                    contriStatus,
                    style: const TextStyle(
                      fontFamily: 'Proxima Nova',
                      fontWeight: FontWeight.w700,
                      fontSize: 11.1,
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
