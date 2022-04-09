import React, { useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'

import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { BsDownload } from 'react-icons/bs'

const Index = () => {
  const qrImageRef = useRef(null)
  const [image, takeScreenShot] = useScreenshot()
  const [input, setInput] = useState('')
  const [qrValue, setQrValue] = useState('Simple text')
  const [bgColorInput, setBgColorInput] = useState('transparent')
  const [fgColorInput, setFgColorInput] = useState('white')
  const [update, setUpdate] = useState(false)
  const createQr = async () => {
    await setQrValue(input)
    await takeScreenShot(qrImageRef.current)
    setUpdate(false)
  }
  useEffect(() => {
    if (!input) {
      setQrValue('First, Type Something Please')
    }
  }, [input])

  return (
    <div className=" h-screen w-screen p-8">
      <div className="flex h-full w-full justify-between rounded-3xl bg-[#EBF7FF] p-10">
        <div className="flex w-[60%] flex-col items-center  justify-center text-justify">
          <h1 className="mb-5 text-6xl font-semibold text-[#012585]">
            Enter Your Text
          </h1>
          <p className="text-gray-500">
            Click Generate Button to create QR Code
          </p>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createQr()
              }
            }}
            className="my-10  h-12 w-[30rem] rounded  border-2 border-gray-400 bg-transparent px-4 outline-none focus-within:border-[#3DBCFA]"
            placeholder="Example Text"
          />
          <button
            onClick={createQr}
            className=" h-12 w-32 rounded-lg bg-[#3DBCFA] font-semibold text-white hover:bg-[#27a3e2]"
          >
            {update ? 'Update' : 'Generate'}
          </button>
        </div>
        <div className="flex w-[30%]  flex-col items-center rounded-3xl bg-[#00298A] p-8">
          <h1 className="mb-8 text-4xl text-white">Your QR Code</h1>
          <div ref={qrImageRef} className="bg-[#00298A]">
            <QRCodeSVG
              level="H"
              value={qrValue}
              bgColor={bgColorInput}
              fgColor={fgColorInput}
            />
          </div>
          <label className="glassorism mt-16 flex w-full justify-between p-4">
            <p className="text-white">Background Color</p>

            <input
              type="color"
              className="w-16 rounded border-2 focus-within:border-[#3dbcfa] hover:cursor-pointer"
              onChange={(e) => {
                setBgColorInput(e.target.value)
                setUpdate(true)
              }}
            />
          </label>
          <label className="glassorism mt-6 flex w-full justify-between p-4">
            <p className="text-white">QrCode Color</p>

            <input
              type="color"
              className="w-16 rounded border-2 focus-within:border-[#3dbcfa] hover:cursor-pointer"
              onChange={(e) => {
                setFgColorInput(e.target.value)
                setUpdate(true)
              }}
            />
          </label>
          <button
            onClick={() => {
              setBgColorInput('transparent')
            }}
            className="mt-6 text-white underline underline-offset-2 hover:no-underline"
          >
            Transparent
          </button>
          <a
            href={image}
            download={'Qrcode'}
            className="mt-6 flex h-14 w-44 items-center justify-center rounded-md    bg-[#FF9B04] text-lg text-white hover:bg-[#e8910f]"
          >
            <BsDownload className="text-xl" />
            <p className="ml-3">Download</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Index
