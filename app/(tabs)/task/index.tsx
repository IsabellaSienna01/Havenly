import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Polyline, Line } from 'react-native-svg';
import Task, { TaskVariant } from '@/components/task';
import { taskStore } from '@/utils/taskStore';
import DateWidget from '@/components/date-widget';
import { CrisisButton } from '@/components/crisis-button';
import { MonthSelector } from '@/components/month-selector';
import { useTheme } from '@/theme/ThemeContext';

const { width, height } = Dimensions.get('window');

type DummyTask = {
  id: string;
  title: string;
  subtitle: string;
  date: Date;
  variant: TaskVariant;
};

const generateDummyTasks = (): DummyTask[] => {
  const tasks: DummyTask[] = [];
  const today = new Date();

  const createDate = (monthOffset: number, day: number) => {
    return new Date(today.getFullYear(), today.getMonth() + monthOffset, day);
  };

  tasks.push({ id: '1', title: 'Final Project Human Computer Interaction', subtitle: 'Create UI/UX Design.', date: createDate(0, 3), variant: 'normal' });
  tasks.push({ id: '2', title: 'ITS Website Migration', subtitle: 'Update Wordpress site.', date: createDate(0, 2), variant: 'normal' });
  tasks.push({ id: '3', title: 'Final Project Database Management', subtitle: 'Create Backend implementation.', date: createDate(0, 2), variant: 'normal' });
  tasks.push({ id: '4', title: 'Prepare Midterm Materials', subtitle: 'Review all materials.', date: createDate(1, 15), variant: 'normal' });
  tasks.push({ id: '5', title: 'Finish UI/UX Design Mockups', subtitle: 'Continue develop the dashboard page.', date: createDate(-1, 28), variant: 'normal' });

  return tasks;
};

const ALL_TASKS = generateDummyTasks();

const isSameMonthAndYear = (d1: Date, d2: Date) => {
  return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};

export default function TaskPage() {
  const router = useRouter();
  const [storeVersion, setStoreVersion] = useState(0);
  const { colors, scale } = useTheme();

  useEffect(() => {
    const unsubscribe = taskStore.subscribe(() => {
      setStoreVersion(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Filter tasks by selected month
  const filteredTasks = useMemo(() => {
    return ALL_TASKS.filter(task => isSameMonthAndYear(task.date, currentDate))
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort descending by date
  }, [currentDate]);

  // Group tasks by date string
  const groupedTasks = useMemo(() => {
    const groups: Record<string, DummyTask[]> = {};
    filteredTasks.forEach(task => {
      const dateStr = task.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(task);
    });
    return groups;
  }, [filteredTasks]);

  const handleSeeSubtask = (id: string) => {
    router.push(`/task/list?id=${id}`);
  };

  const handleCreateTask = () => {
    router.push('/home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.secondary }]} edges={['top', 'bottom']}>
      <LinearGradient colors={[colors.secondary, colors.primary]} style={StyleSheet.absoluteFillObject} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Header Section */}
        <View style={styles.topSection}>
          <View style={styles.crisisWrapper}>
            <CrisisButton onClick={() => router.push('/crisis-mode' as any)} />
          </View>
          
          <View style={styles.dateWidgetWrapper}>
            <DateWidget variant="transparent" />
          </View>
        </View>

        {/* Bottom White Container with Tasks */}
        <View style={[styles.bottomCardContainer, { backgroundColor: colors.background }]}>
          <View style={styles.bottomCardContent}>
            <MonthSelector
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />

            {filteredTasks.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginBottom: 16 }}>
                  <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <Polyline points="14 2 14 8 20 8" />
                  <Line x1="16" y1="13" x2="8" y2="13" />
                  <Line x1="16" y1="17" x2="8" y2="17" />
                  <Polyline points="10 9 9 9 8 9" />
                </Svg>
                <Text style={[styles.emptyStateTitle, { color: colors.text, fontSize: 18 * scale }]}>No tasks for this month</Text>
                <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary, fontSize: 14 * scale }]}>Start planning your goals!</Text>

                <TouchableOpacity style={[styles.createTaskButton, { backgroundColor: colors.primary }]} onPress={handleCreateTask}>
                  <Text style={styles.createTaskButtonText}>Create Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              Object.entries(groupedTasks).map(([dateStr, tasks]) => (
                <View key={dateStr} style={styles.dateGroup}>
                  <Text style={[styles.dateGroupText, { color: colors.text, fontSize: 14 * scale }]}>{dateStr}</Text>
                  <View style={styles.tasksList}>
                    {tasks.map((task, index) => (
                      <Task
                        key={task.id}
                        index={index + 1}
                        title={task.title}
                        subtitle={task.subtitle}
                        variant={task.variant}
                        isCompleted={taskStore.getTasks(task.id).length === 0}
                        onSeeSubtask={() => handleSeeSubtask(task.id)}
                      />
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b3dcd1',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 0, 
  },
  topSection: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 20,
    zIndex: 20,
  },
  crisisWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 30,
  },
  dateWidgetWrapper: {
    width: '100%',
    marginTop: 60,
    alignItems: 'center',
  },
  bottomCardContainer: {
    flex: 1, // Let it expand to the bottom
    width: '100%',
    maxWidth: 400,
    marginTop: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FEFDF6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    minHeight: 500,
  },
  bottomCardContent: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 180, // For navbar
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 32,
  },
  emptyStateTitle: {
    fontFamily: 'SourceSerifPro-Bold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(26, 26, 26, 0.7)',
    marginBottom: 24,
  },
  createTaskButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createTaskButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateGroupText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 8,
    marginBottom: 16,
  },
  tasksList: {
    gap: 20,
  }
});
