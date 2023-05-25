from kivy.app import App
from kivy.lang import Builder
from kivy.core.window import Window
from kivy.config import Config
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout

# Set Window size
Config.set('graphics', 'width', '360')
Config.set('graphics', 'height', '800')
Config.write()

class RootWidget(BoxLayout):
    print('RootWidget')
    pass

# Load the kv file
root_widget = Builder.load_file("workout.kv")

workouts = {
    "Day 1: Upper Body Strength Training": [
        "Warm-up (10 minutes): Light cardio such as jogging in place or skipping rope.",
        "Barbell Bench Press (if you have a bench): 3 sets of 8-12 reps",
        "Standing Overhead Press: 3 sets of 8-12 reps",
        "Bent Over Rows: 3 sets of 8-12 reps",
        "Bicep Curls (Dumbbell or Barbell): 3 sets of 8-12 reps",
        "Overhead Tricep Extensions (Dumbbell): 3 sets of 8-12 reps",
        "Cool Down (10 minutes): Stretching exercises.",
    ],
    "Day 2: Lower Body Strength Training": [
        "Warm-up (10 minutes): Light cardio such as jogging in place or skipping rope.",
        "Squats (Barbell or Dumbbell): 3 sets of 8-12 reps",
        "Deadlifts (Barbell or Dumbbell): 3 sets of 8-12 reps",
        "Lunges (Holding Dumbbells): 3 sets of 8-12 reps",
        "Calf Raises (Holding Dumbbells or Barbell): 3 sets of 8-12 reps",
        "Abdominal Exercises (Planks, Crunches): 3 sets of 10-15 reps",
        "Cool Down (10 minutes): Stretching exercises.",
    ]
}

class WorkoutApp(App):
    def build(self):
        root_widget.ids.scroll_layout.clear_widgets()
        for workout_name, workout_steps in workouts.items():
            root_widget.ids.scroll_layout.add_widget(WorkoutLabel(text=workout_name, font_size=20))
            for step in workout_steps:
                root_widget.ids.scroll_layout.add_widget(WorkoutLabel(text='   ' + step))
        return root_widget


class WorkoutLabel(Label):
    pass

if __name__ == '__main__':
    WorkoutApp().run()
