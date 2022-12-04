# Components

### Heading

```
<Heading
	text={"Hello World!"}
	type={"bold"} //"light" or "thin"
	color={"light"} // or "dark"
/>
```

### Subheading

```
<SubHeading
	text={"Subheading here"}
	type={"bold"} //"thin" or "regular"
	color={"light"} // or "dark"
/>
```

### Exam Card

```
<ExamCard
	days={22}
	name={"Mid-Sem Exam"}
	color={"#FECF6F"}
/>
```

![Exam Card](https://i.postimg.cc/MKLfZ8Gq/Screenshot-2022-12-04-at-14-42-17.png)

### Course card

```
<CourseCard
	code={"CL 309"}
	color={"#DBCEFF"}
	name={"Process Control and Instrumentation"}
/>
```

![card](https://i.postimg.cc/DwVsdT35/Screenshot-2022-12-04-at-14-48-00.png)

### Space

```
<Space  amount={20}  />
```

### Favourite card

```
<FavouriteCard
	type={"folder"}
	color={"#EDF492"}
	path={"Lecture Slides"}
	name={"Premidsem"}
	subject={"Green Chemistry"}
/>
```

![card](https://i.postimg.cc/Gm7828xB/Screenshot-2022-12-04-at-14-50-14.png)

```
<FavouriteCard
	type={"file"}
	color={""} //default color
	path={"Exams > Quiz 1"}
	name={"Quiz 1 QP.pdf"}
	subject={"Chemical Reaction Engineering"}
/>
```

![card](https://i.postimg.cc/DwM0FV7L/Screenshot-2022-12-04-at-14-50-11.png)
