import React from "react"
import { useForm, Controller, watch } from "react-hook-form";
import Container from '@material-ui/core/Container';
import Input from "@material-ui/core/Input"

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm();
  const onSubmit = (data) => {
    // React Hook Formでは、handleSubmit関数がこのイベントを自動的に処理してくれるため、
    // 引数名は適当でいい

    console.log(data)
  }
  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
          </div>

          <div>
            <label htmlFor="birth">Q2. 生年月日 (例： 19900101)</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
            {errors.birth && <span>{errors.birth.message}</span>}
          </div>

          <div>
            <label>Q3. 現在、プログラミングを学習していますか？</label>
            <div>
              <label htmlFor="yes">はい</label>
              <input type="radio" {...register("learning", { required: true }, { value: "yes" })} id="yes" value="yes" />
              <label htmlFor="no">いいえ</label>
              <input type="radio" {...register("learning", { required: true }, { value: "no" })} id="no" value="no" />
              <label htmlFor="not-sure">わからない</label>
              <input type="radio" {...register("learning", { required: true }, { value: "not-sure" })} id="not-sure" value="not-sure" />
              {errors.learning && <span>このフィールドは回答必須です。</span>}
            </div>
          </div>

          <div>
            <label>Q4. これまでに、プログラミングを学習したことがありますか？</label>
            <div>
              <label htmlFor="yes">はい</label>
              <input type="radio" {...register("learned", { required: true }, { value: "yes" })} id="yes" value="yes" />
              <label htmlFor="no">いいえ</label>
              <input type="radio" {...register("learned", { required: true }, { value: "no" })} id="no" value="no" />
              <label htmlFor="not-sure">わからない</label>
              <input type="radio" {...register("learned", { required: true }, { value: "not-sure" })} id="not-sure" value="not-sure" />
              {errors.learned && <span>このフィールドは回答必須です。</span>}
            </div>
          </div>

          {((watch("learning") === "yes") || (watch("learned") === "yes")) && (
            <div>
              <label htmlFor="languages">
                Q5. 今まで学習したことのあるプログラミング言語をすべて教えてください。
              </label>
              <Controller
                name="languages"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} />
                )}
              />
            </div>
          )}

          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  )
}
