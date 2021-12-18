import { Calendar, Cell, Field, Popup, Picker, Button } from '@taroify/core';
import { ArrowRight } from '@taroify/icons';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const [minDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [maxDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 0)
  );
  const [formatValue, setFormatValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Date>();
  const [fieldValue, setFieldValue] = useState<string>('');
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [dayUse, setDayUse] = useState<string[]>([]);

  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: 'dbRun',
        data: {
          type: 'get',
          db: 'dailyRecord',
          data: {},
        },
      })
      .then(res => {
        console.log(res);
        if (res.errMsg === 'cloud.callFunction:ok' && res.result) {
          setDayUse(res?.result['data']);
        } else {
          console.log(res, '210');
        }
      });
  }, []);

  const handleFormatter = (day: Calendar.DayObject) => {
    const date = day.value.getDate();
    const month = day.value.getMonth() + 1;

    dayUse.map(item => {
      const dayItem = item['date'].substring(item['date'].lastIndexOf('-') + 1);
      if (date === Number(dayItem)) {
        day.children =
          item['type'] === 'A' ? (
            <text className="iconfont">&#xe606;</text>
          ) : (
            <text className="iconfont">&#xe608;</text>
          );
      }
    });

    return day;
  };

  const handleSubmit = (fieldValue: string) => {
    Taro.cloud
      .callFunction({
        name: 'dbRun',
        data: {
          type: 'insert',
          db: 'dailyRecord',
          data: {
            type: fieldValue,
            date: dayjs().format('YYYY-MM-DD'),
          },
        },
      })
      .then(res => {
        console.log(res, '--11-1111111--12-');
      });
  };

  return (
    <View className="index">
      <Cell
        title="瞅瞅今天用啥 👀"
        clickable
        rightIcon={<ArrowRight />}
        children={formatValue}
        onClick={() => setOpen(true)}
      />
      <Popup
        style={{ height: '80%' }}
        open={open}
        rounded
        placement="bottom"
        onClose={setOpen}
      >
        <Calendar
          type="single"
          readonly
          value={value}
          min={minDate}
          max={maxDate}
          onChange={setValue}
          formatter={handleFormatter}
          // onConfirm={newValue => {
          //   setFormatValue(formatFullDate(newValue));
          //   setOpen(false);
          // }}
        ></Calendar>
      </Popup>

      <Field
        value={fieldValue}
        label="护肤环节"
        placeholder="选择护肤"
        readonly
        rightIcon={<ArrowRight />}
        onClick={() => setOpenPicker(true)}
      />
      <Popup
        open={openPicker}
        rounded
        placement="bottom"
        onClose={setOpenPicker}
      >
        <Picker
          onCancel={() => setOpenPicker(false)}
          onConfirm={values => {
            setFieldValue(values);
            setOpenPicker(false);
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>选择护肤</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>A</Picker.Option>
            <Picker.Option>C</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>

      <Button
        color="info"
        size="mini"
        block
        variant="outlined"
        style={{ width: '100px', margin: '20px auto' }}
        onClick={() => handleSubmit(fieldValue[0])}
      >
        确认
      </Button>
    </View>
  );
};

export default Index;
