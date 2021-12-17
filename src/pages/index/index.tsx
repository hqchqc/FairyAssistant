import { Calendar, Cell, Field, Popup, Picker, Button } from '@taroify/core';
import { ArrowRight } from '@taroify/icons';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
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

  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {
          a: 31,
          b: 111,
        },
      })
      .then(res => {
        // res.ress.then(a => {
        //   console.log(a);
        // });
        console.log(res);
      });
  }, []);

  const handleFormatter = (day: Calendar.DayObject) => {
    const month = day.value.getMonth() + 1;
    const date = day.value.getDate();

    if (month === 12) {
      if (date === 14) {
        day.children = day.children = (
          <text className="iconfont">&#xe606;</text>
        );
      } else if (date === 15) {
        day.children = <text className="iconfont">&#xe608;</text>;
      }
    }

    return day;
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
        onClick={() => console.log(fieldValue)}
      >
        确认
      </Button>
    </View>
  );
};

export default Index;
